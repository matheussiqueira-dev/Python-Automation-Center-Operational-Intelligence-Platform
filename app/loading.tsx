import { LoadingState } from "@/components/shared/loading-state";

export default function Loading() {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <LoadingState label="Carregando plataforma operacional" />
      </div>
    </div>
  );
}
