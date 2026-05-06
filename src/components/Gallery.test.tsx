import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Gallery from './Gallery'

// Mock dnd-kit
vi.mock('@dnd-kit/core', () => ({
  DndContext: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  closestCenter: vi.fn(),
  PointerSensor: vi.fn(),
  useSensor: vi.fn(),
  useSensors: vi.fn(() => []),
}))

vi.mock('@dnd-kit/sortable', () => ({
  SortableContext: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  arrayMove: vi.fn(),
  rectSortingStrategy: vi.fn(),
  useSortable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: () => {},
    transform: null,
    transition: null,
    isDragging: false,
  }),
}))

vi.mock('@dnd-kit/utilities', () => ({
  CSS: {
    Transform: {
      toString: () => '',
    },
  },
}))

// Mock image imports
vi.mock('../data/images', () => ({
  INITIAL_IMAGES: [
    { id: '1', url: '/bean-pictures/bean1.webp', alt: 'Bean 1' },
    { id: '2', url: '/bean-pictures/bean2.webp', alt: 'Bean 2' },
    { id: '3', url: '/bean-pictures/bean3.webp', alt: 'Bean 3' },
  ],
}))

describe('Gallery', () => {

  // Rendering 

  it('renders all images from initial data', () => {
    render(<Gallery />)

    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(3)
  })

  it('does not show delete bar when nothing is selected', () => {
    render(<Gallery />)

    expect(screen.queryByText(/selected/i)).not.toBeInTheDocument()
  })

  // Selection

  it('shows delete bar when an image is selected', async () => {
    const user = userEvent.setup()
    render(<Gallery />)

    const selectButtons = screen.getAllByRole('button', { name: /select image/i })
    await user.click(selectButtons[0])

    expect(screen.getByText(/1 image selected/i)).toBeInTheDocument()
  })

  it('updates selected count when multiple images are selected', async () => {
    const user = userEvent.setup()
    render(<Gallery />)

    const selectButtons = screen.getAllByRole('button', { name: /select image/i })
    await user.click(selectButtons[0])
    await user.click(selectButtons[1])

    expect(screen.getByText(/2 images selected/i)).toBeInTheDocument()
  })

  it('deselects image when clicked again', async () => {
    const user = userEvent.setup()
    render(<Gallery />)

    const selectButtons = screen.getAllByRole('button', { name: /select image/i })
    await user.click(selectButtons[0])
    await user.click(selectButtons[0])

    expect(screen.queryByText(/selected/i)).not.toBeInTheDocument()
  })

  // Deletion

  it('removes selected images after confirming deletion', async () => {
    const user = userEvent.setup()
    vi.spyOn(window, 'confirm').mockReturnValue(true)

    render(<Gallery />)

    const selectButtons = screen.getAllByRole('button', { name: /select image/i })
    await user.click(selectButtons[0])

    const deleteButton = screen.getByRole('button', { name: /delete selected/i })
    await user.click(deleteButton)

    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(2)
  })

  it('keeps images when deletion is cancelled', async () => {
    const user = userEvent.setup()
    vi.spyOn(window, 'confirm').mockReturnValue(false)

    render(<Gallery />)

    const selectButtons = screen.getAllByRole('button', { name: /select image/i })
    await user.click(selectButtons[0])

    const deleteButton = screen.getByRole('button', { name: /delete selected/i })
    await user.click(deleteButton)

    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(3)
  })

})