export function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between">
        <p>Python Automation Center - Operational Intelligence Platform</p>
        <p>
          Desenvolvido por Matheus Siqueira{" "}
          <a
            href="https://www.matheussiqueira.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-emerald-200 hover:text-emerald-100"
          >
            www.matheussiqueira.dev
          </a>
        </p>
      </div>
    </footer>
  );
}
