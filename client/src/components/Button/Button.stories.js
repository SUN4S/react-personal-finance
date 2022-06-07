import { Button } from "./Button";

export default {
  title: "Button",
  component: Button,
};

export const Primary_Light = () => (
  <html data-theme="light">
    <Button type="button" text="Press me!" class="primaryBtn" />
  </html>
);

export const Primary_Dark = () => (
  <html data-theme="dark">
    <Button type="button" text="Press me!" class="primaryBtn" />
  </html>
);

export const Primary_Loading = () => (
  <html data-theme="dark">
    <Button
      type="button"
      text="Press me!"
      class="primaryBtn"
      loading
      disabled
    />
  </html>
);

export const Secondary_Light = () => (
  <html data-theme="light">
    <Button type="button" text="Press me!" class="secondaryBtn" />
  </html>
);

export const Secondary_Dark = () => (
  <html data-theme="dark">
    <Button type="button" text="Press me!" class="secondaryBtn" />
  </html>
);

export const Secondary_Loading = () => (
  <html data-theme="dark">
    <Button
      type="button"
      text="Press me!"
      class="secondaryBtn"
      loading
      disabled
    />
  </html>
);

export const Gray_light = () => (
  <html data-theme="light">
    <Button type="button" text="Press me!" class="grayBtn" />
  </html>
);

export const Gray_Light_Loading = () => (
  <html data-theme="light">
    <Button type="button" text="Press me!" class="grayBtn" loading disabled />
  </html>
);

export const Gray_Dark = () => (
  <html data-theme="dark">
    <Button type="button" text="Press me!" class="grayBtn" />
  </html>
);

export const Gray_Dark_Loading = () => (
  <html data-theme="dark">
    <Button type="button" text="Press me!" class="grayBtn" loading disabled />
  </html>
);
