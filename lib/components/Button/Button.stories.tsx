import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent } from 'storybook/test';

import { Button } from './index';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Um componente de botão reutilizável com diferentes variações de estilo e tamanho, construído sobre o primitive `Button` do Base UI.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'A variação visual do botão',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'O tamanho do botão',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Se o botão está desabilitado',
    },
    children: {
      control: { type: 'text' },
      description: 'O conteúdo do botão',
    },
    focusableWhenDisabled: {
      control: { type: 'boolean' },
      description:
        'Mantém o botão focável quando desabilitado (útil para estados de loading)',
    },
    onClick: {
      action: 'clicked',
      description: 'Função chamada quando o botão é clicado',
    },
  },
  args: {
    onClick: fn(),
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story padrão
export const Default: Story = {
  args: {
    children: 'Clique aqui',
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
};

// Story do botão primário
export const Primary: Story = {
  args: {
    children: 'Botão Primário',
    variant: 'primary',
    size: 'md',
  },
};

// Story do botão secundário
export const Secondary: Story = {
  args: {
    children: 'Botão Secundário',
    variant: 'secondary',
    size: 'md',
  },
};

// Story do botão outline
export const Outline: Story = {
  args: {
    children: 'Botão Outline',
    variant: 'outline',
    size: 'md',
  },
};

// Story do botão ghost
export const Ghost: Story = {
  args: {
    children: 'Botão Ghost',
    variant: 'ghost',
    size: 'md',
  },
};

// Story do botão pequeno
export const Small: Story = {
  args: {
    children: 'Pequeno',
    variant: 'primary',
    size: 'sm',
  },
};

// Story do botão médio
export const Medium: Story = {
  args: {
    children: 'Médio',
    variant: 'primary',
    size: 'md',
  },
};

// Story do botão grande
export const Large: Story = {
  args: {
    children: 'Grande',
    variant: 'primary',
    size: 'lg',
  },
};

// Story do botão desabilitado
export const Disabled: Story = {
  args: {
    children: 'Desabilitado',
    variant: 'primary',
    size: 'md',
    disabled: true,
  },
};

// Story com todos os tamanhos
export const AllSizes: Story = {
  render: () => (
    <div className='flex flex-col gap-4 items-center'>
      <div className='flex gap-2 items-center'>
        <Button variant='primary' size='sm'>
          Pequeno
        </Button>
        <Button variant='primary' size='md'>
          Médio
        </Button>
        <Button variant='primary' size='lg'>
          Grande
        </Button>
      </div>
    </div>
  ),
};

// Story com todas as variações
export const AllVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-4 items-center'>
      <div className='flex gap-2 items-center'>
        <Button variant='primary'>Primário</Button>
        <Button variant='secondary'>Secundário</Button>
        <Button variant='outline'>Outline</Button>
        <Button variant='ghost'>Ghost</Button>
      </div>
    </div>
  ),
};

// Story com ícone (exemplo)
export const WithIcon: Story = {
  args: {
    children: '📧 Enviar Email',
    variant: 'primary',
    size: 'md',
  },
};

// Story com loading state: continua focável para não perder o foco do teclado
export const Loading: Story = {
  args: {
    children: 'Carregando...',
    variant: 'primary',
    size: 'md',
    disabled: true,
    focusableWhenDisabled: true,
  },
};

// Story renderizando outro elemento através da prop `render` do Base UI
export const AsLink: Story = {
  args: {
    children: 'Ir para a documentação',
    variant: 'outline',
    nativeButton: false,
    render: <a href='https://base-ui.com/react/components/button' />,
  },
};

// Teste de interação: o clique dispara `onClick`
export const ClickInteraction: Story = {
  args: {
    children: 'Clique',
  },
  play: async ({ args, canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Clique' }));
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

// Teste de interação: botão desabilitado não dispara `onClick`
export const DisabledInteraction: Story = {
  args: {
    children: 'Desabilitado',
    disabled: true,
  },
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole('button', { name: 'Desabilitado' });
    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute('data-disabled');
    await userEvent.click(button, { pointerEventsCheck: 0 });
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

// Teste de interação: `focusableWhenDisabled` mantém o foco sem disparar clique
export const FocusableWhenDisabledInteraction: Story = {
  args: {
    children: 'Carregando...',
    disabled: true,
    focusableWhenDisabled: true,
  },
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole('button', { name: 'Carregando...' });
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await expect(button).toHaveAttribute('aria-disabled', 'true');
    await userEvent.click(button, { pointerEventsCheck: 0 });
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

// Teste: `className` do consumidor sobrescreve classes conflitantes (tailwind-merge)
export const ClassNameOverride: Story = {
  args: {
    children: 'Customizado',
    className: 'bg-red-600 px-8',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'Customizado' });
    await expect(button).toHaveClass('bg-red-600', 'px-8');
    await expect(button).not.toHaveClass('bg-blue-600');
    await expect(button).not.toHaveClass('px-4');
  },
};
