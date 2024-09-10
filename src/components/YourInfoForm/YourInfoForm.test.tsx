/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { YourInfoForm } from "./YourInfoForm";
import { store } from "store";

describe("YourInfoForm", () => {
  test("renders the form with initial values", () => {
    render(
      <Provider store={store}>
        <YourInfoForm />
      </Provider>
    );

    expect(screen.getByText("Personal info")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Please provide your name, email address, and phone number."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("e.g. Stephen King")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("e.g. stephenking@lorem.com")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("e.g. +1 234 567 890")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Next Step/i })
    ).toBeInTheDocument();
  });

  test("shows validation errors when fields are empty and form is submitted", async () => {
    render(
      <Provider store={store}>
        <YourInfoForm />
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /Next Step/i }));

    expect(await screen.findByTestId("errorText")).toBeInTheDocument();
  });

  test("dispatches actions on form submission", async () => {
    render(
      <Provider store={store}>
        <YourInfoForm />
      </Provider>
    );

    fireEvent.input(screen.getByPlaceholderText("e.g. Stephen King"), {
      target: { value: "John Doe" },
    });
    fireEvent.input(screen.getByPlaceholderText("e.g. stephenking@lorem.com"), {
      target: { value: "john@example.com" },
    });
    fireEvent.input(screen.getByPlaceholderText("e.g. +1 234 567 890"), {
      target: { value: "1234567890" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Next Step/i }));

    await waitFor(() => {
      expect(store.getState().setPersonalData.personalInfo.name).toBe(
        "John Doe"
      );
      expect(store.getState().setPersonalData.personalInfo.email).toBe(
        "john@example.com"
      );
      expect(store.getState().setPersonalData.personalInfo.phone).toBe(
        "1234567890"
      );
    });
  });
});
