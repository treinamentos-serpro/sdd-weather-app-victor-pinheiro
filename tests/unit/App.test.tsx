import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../../src/App';

describe('App (mock-first)', () => {
  it('exibe estado inicial idle', () => {
    render(<App />);
    expect(screen.getByText(/busque por uma cidade para ver o clima/i)).toBeInTheDocument();
  });

  it('exibe loading e depois sucesso ao buscar cidade existente', async () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/buscar cidade por nome/i), {
      target: { value: 'Sao Paulo' },
    });
    fireEvent.click(screen.getByRole('button', { name: /buscar/i }));

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: 'Sao Paulo' })).toBeInTheDocument();
    expect(
      await screen.findByRole('heading', { name: /previsao para 5 dias/i }),
    ).toBeInTheDocument();
  });

  it('exibe estado vazio para cidade nao encontrada', async () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/buscar cidade por nome/i), {
      target: { value: 'Cidade Inexistente' },
    });
    fireEvent.click(screen.getByRole('button', { name: /buscar/i }));

    expect(await screen.findByText(/nenhuma cidade encontrada/i)).toBeInTheDocument();
  });

  it('exibe estado de erro e permite tentar novamente', async () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/buscar cidade por nome/i), {
      target: { value: 'erro' },
    });
    fireEvent.click(screen.getByRole('button', { name: /buscar/i }));

    expect(await screen.findByRole('alert')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/buscar cidade por nome/i), {
      target: { value: 'Lisboa' },
    });
    fireEvent.click(screen.getByRole('button', { name: /buscar/i }));

    expect(await screen.findByRole('heading', { name: 'Lisboa' })).toBeInTheDocument();
  });

  it('alterna temperatura para fahrenheit no sucesso', async () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/buscar cidade por nome/i), {
      target: { value: 'Sao Paulo' },
    });
    fireEvent.click(screen.getByRole('button', { name: /buscar/i }));

    expect(await screen.findByRole('heading', { name: 'Sao Paulo' })).toBeInTheDocument();
    expect(screen.getAllByText('22°').length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole('button', { name: /alternar para fahrenheit/i }));
    expect(screen.getAllByText('72°').length).toBeGreaterThan(0);
  });
});
