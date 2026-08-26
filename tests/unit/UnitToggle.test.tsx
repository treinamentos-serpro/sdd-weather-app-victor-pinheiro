import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import UnitToggle from '../../src/components/UnitToggle';

describe('UnitToggle', () => {
  it('renderiza estado ativo com aria-pressed', () => {
    render(<UnitToggle unit="celsius" onChange={vi.fn()} />);

    expect(screen.getByRole('button', { name: /alternar para celsius/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: /alternar para fahrenheit/i })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('chama onChange ao clicar na unidade inativa', () => {
    const onChange = vi.fn();
    render(<UnitToggle unit="celsius" onChange={onChange} />);

    fireEvent.click(screen.getByRole('button', { name: /alternar para fahrenheit/i }));
    expect(onChange).toHaveBeenCalledWith('fahrenheit');
  });
});
