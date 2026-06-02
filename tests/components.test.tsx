import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";
import { AutomationGrid } from "@/components/automations/automation-grid";
import { getAutomations } from "@/lib/mock-data";

describe("critical UI rendering", () => {
  it("renders the home product headline", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { name: /Python Automation Center/i })).toBeInTheDocument();
    expect(screen.getByText(/Transforme bases desorganizadas/i)).toBeInTheDocument();
  });

  it("renders automation cards", () => {
    render(<AutomationGrid automations={getAutomations()} />);

    expect(screen.getByText("Limpeza de planilhas administrativas")).toBeInTheDocument();
    expect(screen.getAllByText("Executar demo").length).toBeGreaterThan(0);
  });
});
