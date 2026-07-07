import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";
import { AutomationGrid } from "@/components/automations/automation-grid";
import { DataQualityMonitor } from "@/components/data-quality/data-quality-monitor";
import { getAutomations } from "@/lib/mock-data";
import { getDataQualityReports, getDatasetProfiles } from "@/lib/data-quality";

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

  it("renders the data quality monitor", () => {
    render(<DataQualityMonitor datasets={getDatasetProfiles()} reports={getDataQualityReports()} />);

    expect(screen.getByText("Score geral")).toBeInTheDocument();
    expect(screen.getByText("Completude por coluna")).toBeInTheDocument();
  });
});
