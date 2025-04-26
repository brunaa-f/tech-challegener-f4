"use client";

/**
 * Componente de Loading
 *
 * Este componente exibe uma animação de carregamento, 
 * mostrando um círculo giratório e um texto "Carregando...".
 *
 * @returns {JSX.Element} Um elemento de carregamento que pode ser utilizado em outros componentes.
 */
export default function Loading() {
  return (
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-fiap-green"></div>
      <span className="mt-4 text-xl font-medium text-fiap-navy-blue">Carregando...</span>
    </div>
  );
}