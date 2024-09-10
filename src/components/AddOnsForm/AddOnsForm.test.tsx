import { render, screen } from "@testing-library/react";
import { AddOnsForm } from "./AddOnsForm";
import { Provider } from "react-redux";
import { store } from "store";
import { AddOnsOption } from "./AddOnsOption";

describe("AddOnsForm", () => {
  it("should render AddOnsForm", () => {
    render(
      <Provider store={store}>
        <AddOnsForm />
      </Provider>
    );

    expect(screen.getByTestId("add-ons-form")).toBeInTheDocument();
    expect(screen.getByTestId("buttons")).toBeInTheDocument();
  });
  it("should render AddOnsOption correctly", () => {
    render(
      <AddOnsOption
        title="Online service"
        subTitle="Access to multiplayer games"
        price={1}
        register={jest.fn()}
        checked={false}
      />
    );

    expect(screen.getByText("Online service")).toBeInTheDocument();
    expect(screen.getByText("Access to multiplayer games")).toBeInTheDocument();
    expect(screen.getByText("+$1/mo")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("should display the checkbox as checked when the `checked` prop is true", () => {
    render(
      <AddOnsOption
        title="Online service"
        subTitle="Access to multiplayer games"
        price={1}
        register={jest.fn()}
        checked={true}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("should call register function with the right parameters", () => {
    const registerMock = jest.fn();
    render(
      <AddOnsOption
        title="Online service"
        subTitle="Access to multiplayer games"
        price={1}
        register={registerMock}
        checked={false}
      />
    );

    expect(registerMock).toHaveBeenCalledWith("addOnsTitles");
  });
});
