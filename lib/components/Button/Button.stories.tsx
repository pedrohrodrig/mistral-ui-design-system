import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './index';

const meta: Meta<typeof Button> = {
	title: 'Components/Button',
	component: Button,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'Um componente de botão reutilizável com diferentes variações de estilo e tamanho.',
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
		onClick: {
			action: 'clicked',
			description: 'Função chamada quando o botão é clicado',
		},
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

// Story com loading state
export const Loading: Story = {
	args: {
		children: 'Carregando...',
		variant: 'primary',
		size: 'md',
		disabled: true,
	},
};
