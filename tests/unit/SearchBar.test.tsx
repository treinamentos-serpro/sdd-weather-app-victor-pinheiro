import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SearchBar from '../../src/components/SearchBar';

describe('SearchBar', () => {
  it('nao dispara busca com input vazio ou apenas espacos', () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);

    fireEvent.click(screen.getByRole('button', { name: /buscar/i }));
    expect(onSearch).not.toHaveBeenCalled();

    fireEvent.change(screen.getByLabelText(/buscar cidade por nome/i), {
      target: { value: '   ' },
    });
    fireEvent.click(screen.getByRole('button', { name: /buscar/i }));
    expect(onSearch).not.toHaveBeenCalled();
  });

  it('dispara busca com valor trimado', () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);

    fireEvent.change(screen.getByLabelText(/buscar cidade por nome/i), {
      target: { value: '  Lisboa  ' },
    });
    fireEvent.click(screen.getByRole('button', { name: /buscar/i }));

    expect(onSearch).toHaveBeenCalledWith('Lisboa');
  });
});
