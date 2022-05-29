import "react-datepicker/dist/react-datepicker.css";
import "./modal.scss";
import "./modalCustom.scss";

import { ModalInputs, ModalTagInput } from "../../models/modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import {
  useDeleteExpenseMutation,
  useLazyExpenseImageQuery,
  usePostExpenseMutation,
} from "../../services/expenses";

import { Button } from "../Button";
import DatePicker from "react-datepicker";
import Modal from "react-modal";
import { WithContext as ReactTags } from "react-tag-input";
import { RootState } from "../../app/store";
import { notification } from "../../features/notification/NotificationSlice";
import { toggleModal } from "../../features/modal/ModalSlice";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";

const KeyCodes = {
  comma: 188,
  enter: 13,
  space: 32,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export const ModalComponent = () => {
  const modalStatus = useSelector((state: RootState) => state.modal.isOpen);
  const editable = useSelector((state: RootState) => state.modal.editable);
  const modalData = useSelector((state: RootState) => state.modal.data);

  const [tags, setTags] = useState<Array<ModalTagInput>>([]);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const [date, setDate] = useState(new Date());
  const [options, setOptions] = useState<string | undefined>(undefined);
  const dispatch = useAppDispatch();

  const [postExpense, isLoading] = usePostExpenseMutation();
  const [deleteExpense] = useDeleteExpenseMutation();
  const [trigger, result, isSuccess] = useLazyExpenseImageQuery();

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  const handleDelete = (i: number) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag: ModalTagInput) => {
    setTags([...tags, tag]);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ModalInputs>({
    defaultValues: {
      category: "Essentials",
      amount: undefined,
      description: undefined,
      tags: [],
      receipt: "",
    },
  });

  const onSubmit: SubmitHandler<ModalInputs> = (data) => {
    const tagData = tags.map((item) => {
      return item.text;
    });
    const expenseObject = {
      ...data,
      date: date,
      tags: tagData.toString(),
      receipt: selectedFile,
    };
    console.log(expenseObject);
    postExpense(expenseObject);
    dispatch(
      notification({
        title: "Add Expense",
        type: "success",
        message: "Successfully Added Expense",
      })
    );
    dispatch(toggleModal({ isOpen: false }));
    resetForm();
  };

  const handleExpenseDelete = () => {
    if (window.confirm("Are you sure?") && modalData) {
      deleteExpense({ _id: modalData._id! });
    }
    dispatch(
      notification({
        title: "Delete Expense",
        type: "info",
        message: "Successfully Deleted Expense",
      })
    );
    dispatch(toggleModal({ isOpen: false }));
    resetForm();
  };

  const resetForm = useCallback(() => {
    setTags([]);
    setSelectedFile(undefined);
    setPreview("");
    setDate(new Date());
    reset();
  }, [reset]);

  useEffect(() => {
    if (modalData && modalStatus) {
      const tags: ModalTagInput[] = [];
      modalData.tags &&
        modalData.tags.forEach((item, index) => {
          tags.push({ id: index.toString(), text: item });
        });

      setDate(new Date(modalData.date));
      setTags(tags);

      // if (modalData.receipt) {
      //   trigger(modalData.receipt, true);
      //   if (isSuccess) {
      //     console.log(result.data?.file);
      //     const objectUrl = URL.createObjectURL(result.data!.file);
      //     setPreview(objectUrl);
      //   }
      // }

      reset(
        {
          category: modalData.category,
          amount: modalData.amount,
          description: modalData.description,
          receipt: "",
        },
        { keepDefaultValues: true }
      );
    } else {
      resetForm();
    }
  }, [resetForm, modalData, modalStatus, reset, setSelectedFile, trigger]);

  useEffect(() => {
    if (!selectedFile) {
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  return (
    <>
      <Modal
        closeTimeoutMS={200}
        isOpen={modalStatus}
        onRequestClose={() => dispatch(toggleModal({ isOpen: false }))}
        shouldCloseOnOverlayClick={true}
        contentLabel="Expense Modal"
        className="Modal"
        overlayClassName="Overlay"
        id="modal"
      >
        <h2>Add Expense</h2>

        <button
          onClick={() => dispatch(toggleModal({ isOpen: false }))}
          className="closeModalBtn"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Select Time:{" "}
            <DatePicker
              selected={date}
              onChange={(date: Date) => setDate(date)}
              showTimeSelect
              dateFormat="yyyy MM dd HH:mm"
              timeIntervals={5}
            />
          </label>

          <label htmlFor="category">
            Expense Category:
            <div className="selectDropdown">
              <select {...register("category", { required: true })}>
                <option value="Essentials">Essentials</option>
                <option value="Wants">Wants</option>
                <option value="Culture">Culture</option>
                <option value="Unexpected">Unexpected</option>
              </select>
            </div>
          </label>
          <label htmlFor="number">
            Amount Spent:
            <input
              type="number"
              step="0.01"
              {...register("amount", { required: true })}
              placeholder="Amount"
            />
            {errors.amount && <span>This field is required</span>}
          </label>

          <label htmlFor="description">
            Description:{" "}
            <textarea
              {...register("description", { required: true })}
              placeholder="Description"
            />
          </label>

          <label htmlFor="tags">
            Select Tags to add: (press Enter to confirm tag){" "}
            <ReactTags
              tags={tags}
              delimiters={delimiters}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              inputFieldPosition="top"
              autocomplete
              inline={true}
            />
          </label>

          <label htmlFor="file">
            Add receipt photo:
            <div className="receiptSelect">
              <input
                type="file"
                className="customFileInput"
                accept=".jpg,.png.,jpeg"
                {...register("receipt")}
                onChange={onSelectFile}
              />
              {selectedFile && <img src={preview} alt="Receipt preview" />}
            </div>
          </label>
          {!isLoading ? (
            <Button type="button" class="loadingBtn" text="" disabled />
          ) : (
            <Button
              type="submit"
              class={editable ? "modalBtn secondaryBtn" : "modalBtn primaryBtn"}
              text={editable ? "Edit Expense" : "Add Expense"}
            />
          )}

          {editable ? (
            <Button
              type="button"
              class="modalBtn dangerBtn"
              text="Remove Expense"
              action={() => handleExpenseDelete()}
            />
          ) : (
            <Button
              type="button"
              class="modalBtn secondaryBtn"
              text="Clear Form"
              action={() => resetForm()}
            />
          )}
        </form>
      </Modal>
    </>
  );
};
