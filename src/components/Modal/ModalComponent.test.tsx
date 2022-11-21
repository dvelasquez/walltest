import { render } from "@testing-library/react";
import React from "react";
import ModalComponent from "./ModalComponent";

global.window.HTMLDialogElement.prototype.showModal = jest.fn();

describe("ModalComponent test suite", () => {
  it("should render the modal component", () => {
    const mockChildren = <div>Test</div>;
    const { getByText } = render(
      <ModalComponent isOpen={true} setIsModalOpen={jest.fn()}>
        {mockChildren}
      </ModalComponent>
    );
    expect(getByText("Test")).toBeInTheDocument();
  });
});
