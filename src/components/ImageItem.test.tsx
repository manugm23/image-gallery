import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ImageItem from './ImageItem'

// Mock dnd-kit — we don't want to test drag and drop here
vi.mock('@dnd-kit/sortable', () => ({
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

const mockImage = {
  id: '1',
  url: 'https://picsum.photos/id/10/600/400',
  alt: 'Test image',
}

const mockOnToggleSelect = vi.fn()

describe('ImageItem', () => {

  beforeEach(() => {
    mockOnToggleSelect.mockClear()
  })

  // Rendering

  it('renders the image with correct src and alt', () => {
    render(
      <ImageItem
        image={mockImage}
        onToggleSelect={mockOnToggleSelect}
      />
    )

    const img = screen.getByRole('img', { name: 'Test image' })
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', mockImage.url)
  })

  it('shows featured overlay when isFeatured is true', () => {
    render(
      <ImageItem
        image={mockImage}
        isFeatured={true}
        onToggleSelect={mockOnToggleSelect}
      />
    )

    expect(screen.getByText('Favorites')).toBeInTheDocument()
  })

  it('does not show featured overlay when isFeatured is false', () => {
    render(
      <ImageItem
        image={mockImage}
        isFeatured={false}
        onToggleSelect={mockOnToggleSelect}
      />
    )

    expect(screen.queryByText('Favorites')).not.toBeInTheDocument()
  })

  // Selection 

  it('calls onToggleSelect with image id when select button is clicked', async () => {
    const user = userEvent.setup()

    render(
      <ImageItem
        image={mockImage}
        onToggleSelect={mockOnToggleSelect}
      />
    )

    const selectButton = screen.getByRole('button', { name: /select image/i })
    await user.click(selectButton)

    expect(mockOnToggleSelect).toHaveBeenCalledTimes(1)
    expect(mockOnToggleSelect).toHaveBeenCalledWith('1')
  })

  it('shows checkmark when isSelected is true', () => {
    render(
      <ImageItem
        image={mockImage}
        isSelected={true}
        onToggleSelect={mockOnToggleSelect}
      />
    )

    expect(screen.getByText('✓')).toBeInTheDocument()
  })

  it('does not show checkmark when isSelected is false', () => {
    render(
      <ImageItem
        image={mockImage}
        isSelected={false}
        onToggleSelect={mockOnToggleSelect}
      />
    )

    expect(screen.queryByText('✓')).not.toBeInTheDocument()
  })

})