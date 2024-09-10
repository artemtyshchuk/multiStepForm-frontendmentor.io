import { render, screen } from "@testing-library/react";
import { SelectPlanForm } from "./SelectPlanForm";
import { Provider } from "react-redux";
import { store } from "store";
import { PlanOption } from "./PlanOption";
import { ReactComponent as ArcadeIcon } from "assets/images/icon-arcade.svg";

describe("SelectPlanForm", () => {
  it("should render SelectPlanForm", () => {
    render(
      <Provider store={store}>
        <SelectPlanForm />
      </Provider>
    );

    expect(screen.getByTestId("select-plan-form")).toBeInTheDocument();
  });
  it("should render PlanOption with given props", () => {
    render(
      <PlanOption
        icon={ArcadeIcon}
        planName="Arcade"
        planValue="Arcade"
        planPrice="$9/mo"
        isYearly={false}
        discount="2 months free"
        register={() => ({})}
        selectedPlan="Arcade"
      />
    );

    expect(screen.getByText("Arcade")).toBeInTheDocument();
    expect(screen.getByText("$9/mo")).toBeInTheDocument();
    expect(screen.getByText("2 months free")).toBeInTheDocument();
    expect(screen.getByTestId("plan-option")).toBeInTheDocument();
  });

  it("should be active when selectedPlan matches planValue", () => {
    render(
      <PlanOption
        icon={ArcadeIcon}
        planName="Arcade"
        planValue="Arcade"
        planPrice="$9/mo"
        isYearly={false}
        discount="2 months free"
        register={() => ({})}
        selectedPlan="Arcade"
      />
    );

    expect(screen.getByTestId("plan-option")).toHaveClass(
      "planContainer__active"
    );
  });

  it("should not be active when selectedPlan does not match planValue", () => {
    render(
      <PlanOption
        icon={ArcadeIcon}
        planName="Arcade"
        planValue="Arcade"
        planPrice="$9/mo"
        isYearly={false}
        discount="2 months free"
        register={() => ({})}
        selectedPlan="Advanced"
      />
    );

    expect(screen.getByTestId("plan-option")).not.toHaveClass(
      "planContainer__active"
    );
  });
});
