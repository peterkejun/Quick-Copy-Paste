export interface ChipListProps {
    chips: string[]
    onAdd: (label: string) => void
    onDelete: (index: number) => void
}
