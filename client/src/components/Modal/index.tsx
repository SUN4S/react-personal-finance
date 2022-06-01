import "react-datepicker/dist/react-datepicker.css";
import "./modal.scss";
import "./modalCustom.scss";

import { ModalInputs, ModalTagInput } from "../../models/modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import {
  useDeleteExpenseMutation,
  useEditExpenseMutation,
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

// constant keykodes to handle ReactTag addition
//TODO: ReactTags should at some point have recommendations
const KeyCodes = {
  comma: 188,
  enter: 13,
  space: 32,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter, KeyCodes.space];

export const ModalComponent = () => {
  // Redux toolkit Modal data
  // Modal has the ability to receive from 1 to 3 props
  // isOpen prop is REQUIRED, just handles if modal is open or closed
  // editable and data are optional props,
  // that are only used to handle expense edit
  const modalStatus = useSelector((state: RootState) => state.modal.isOpen);
  const editable = useSelector((state: RootState) => state.modal.editable);
  const modalData = useSelector((state: RootState) => state.modal.data);

  // Variables
  const [tags, setTags] = useState<Array<ModalTagInput>>([]);
  const [selectedFile, setSelectedFile] = useState<File | Blob>();
  const [preview, setPreview] = useState<string>();
  const [date, setDate] = useState(new Date());

  // Redux toolkit dispatch function
  const dispatch = useAppDispatch();

  //Redux toolkit Query,Mutation declarations
  const [trigger] = useLazyExpenseImageQuery();
  const [postExpense, isLoading] = usePostExpenseMutation();
  const [editExpense] = useEditExpenseMutation();
  const [deleteExpense] = useDeleteExpenseMutation();

  // Function to handle selected file
  // Only a single file should be permited to be added
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  // Handle deletion of tags
  // Tags are comprised of and Object({text: string, id: string})
  const handleDelete = (i: number) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  // Handle addition of tags
  // Tags are comprised of and Object({text: string, id: string})
  const handleAddition = (tag: ModalTagInput) => {
    setTags([...tags, tag]);
  };

  // React-hook-forms functions to be used and default values
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

  // Handles submision of the form
  // Form has 2 states,
  // 'editable' for when modal is being used to edit expense
  // regular, for when modal is being used to add new expense
  const onSubmit: SubmitHandler<ModalInputs> = (data) => {
    // checks if modal is used to edit expense
    if (editable) {
      // tags need to be parsed from object to array
      const tagData = tags.map((item) => {
        return item.text;
      });
      // Create new object that will be sent to the back-end
      const expenseObject = {
        ...modalData!,
        category: data.category || modalData?.category!,
        tags: [...tagData].toString(),
        receipt: selectedFile || modalData?.receipt,
      };
      // Use Redux toolkit api to send expense data to be edited
      editExpense(expenseObject);
      // Use React toolkit reducer to dispatch notification event
      dispatch(
        notification({
          title: "Edit Expense",
          type: "info",
          message: "Successfully Edited Expense",
        })
      );
    } else {
      // This statement gets handled if modal is NOT editable
      // tags need to be parsed from object to array
      const tagData = tags.map((item) => {
        return item.text;
      });
      // Create new object that will be sent to the back-end

      const expenseObject = {
        ...data,
        date: date,
        tags: tagData.toString(),
        receipt: selectedFile,
      };
      // Use Redux toolkit api to send NEW expense data
      postExpense(expenseObject);
      // Use React toolkit reducer to dispatch notification event
      dispatch(
        notification({
          title: "Add Expense",
          type: "success",
          message: "Successfully Added Expense",
        })
      );
    }
    // Use Redux toolkit to dispatch event to handle modal close
    dispatch(toggleModal({ isOpen: false }));
    resetForm();
  };

  // Handle the deletion of single expense
  const handleExpenseDelete = () => {
    // Firstly, send a confirmation to verify delete
    // TODO: Should add a pseudo modal to confirm selection instead of window.confirm
    if (window.confirm("Are you sure?") && modalData) {
      // Use React toolkit api to send a request to delete selected expense
      deleteExpense({ _id: modalData._id!, receipt: modalData.receipt! });
    }
    // Use React toolkit reducer to dispatch notification event
    dispatch(
      notification({
        title: "Delete Expense",
        type: "info",
        message: "Successfully Deleted Expense",
      })
    );
    // Use Reac toolkit reducer to dispatch modal object
    dispatch(toggleModal({ isOpen: false }));
    // Call a form to reset React-hook-forms form with default values
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
    // When modals status changes,
    // function checks wether there has beed data passed to modal
    // depending if data is passed to modal, it autofills input fields
    if (modalData && modalStatus) {
      // Date is set by using a State
      setDate(new Date(modalData.date));
      // modal Tags and Receipt need extra check to check if render is needed
      // and call an appropriate function
      modalData.tags && renderTags(modalData.tags);
      modalData.receipt && renderReceipt(modalData.receipt);

      // reset function is a React-form-hook predifined function,
      // that if there is NO data, resets to default,
      // and can also be used to REPLACE default values
      // `keepDefaultValues: true` is used to make sure that default(empty) values remain
      // instead of get replaced by the ones defined here
      reset(
        {
          category: modalData.category,
          amount: modalData.amount,
          description: modalData.description,
        },
        { keepDefaultValues: true }
      );
    } else {
      // If modal data is not provided, reset modal data to default values
      resetForm();
    }
  }, [modalData, modalStatus]);

  // Function that gets called if modaldata.receipt passes the check
  const renderReceipt = async (fileName: string) => {
    // trigger is a Redux toolkit api defined function,
    // that executes a request to the server to fetch data
    await trigger(fileName, true).then((response) => {
      // Set preview state as a link to new image
      setPreview(response.data);
    });
  };

  // Function that gets called if modaldata.tags passes the check
  const renderTags = async (tagData: Array<string>) => {
    // Create a new array, and provide typescript interface for rebustness
    const tags: ModalTagInput[] = [];
    // provided data needs to be parsed into one that ReactTags can use
    // ReactTags takes an Object: {id: string, text: string}
    tagData.forEach((item: string, index: number) => {
      tags.push({ id: index.toString(), text: item });
    });
    // set new Object array into tags state
    setTags(tags);
  };

  // When selectedFile state changes, it tries to set preview image in modal
  useEffect(() => {
    // if for some reason no image is present, return
    if (!selectedFile) {
      return;
    }
    // If and image exists, create a link to that image
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
            {editable ? "Change receipt photo" : "Add receipt photo:"}
            <div className="receiptSelect">
              <input
                type="file"
                className="customFileInput"
                accept=".jpg,.png.,jpeg"
                {...register("receipt")}
                onChange={onSelectFile}
              />
              {preview && <img src={preview} alt="Receipt preview" />}
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
