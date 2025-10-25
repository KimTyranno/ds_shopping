'use client'

import { Button } from '@/components/ui/button'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Expand, Plus, X } from 'lucide-react'
import Image from 'next/image'
import { Dispatch, SetStateAction, useState } from 'react'

const SIZE_MAP = {
  sm: {
    box: 'w-20 h-20',
    buttonBox: 'w-4 h-4',
    buttonIcon: 11,
    text: 'text-[10px]',
  },
  md: {
    box: 'w-40 h-40',
    buttonBox: 'w-6 h-6',
    buttonIcon: 14,
    text: 'text-[14px]',
  },
} as const

function SortableImage({
  id,
  src,
  index,
  activeImageIndex,
  onClick,
  onRemove,
  size,
}: {
  id: string
  src: string
  index: number
  activeImageIndex: number
  setActiveImageIndex: (_index: number) => void
  onClick: (_index: number) => void
  onRemove: () => void
  size: 'sm' | 'md'
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const s = SIZE_MAP[size]

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      // ❌ listeners 제거
      onClick={() => onClick(index)}
      className={`relative group flex-shrink-0 ${s.box} rounded-md overflow-hidden border-2 ${
        activeImageIndex === index ? 'border-blue-500' : 'border-gray-200'
      }`}>
      {/* 드래그 핸들 아이콘 영역 (예: 오른쪽 하단에) */}
      <div
        {...listeners}
        className={`absolute bottom-1 right-1 ${s.buttonBox} bg-gray-700 rounded cursor-move z-10 justify-items-center content-center`}>
        <Expand size={s.buttonIcon} className="rotate-45 text-white" />
      </div>
      <Image
        src={src}
        alt={`이미지 ${index + 1}`}
        fill
        sizes="80px"
        className="w-full h-full object-cover"
      />
      <Button
        type="button"
        variant="destructive"
        size="icon"
        className={`absolute top-1 right-1 ${s.buttonBox} opacity-0 group-hover:opacity-100 transition`}
        onClick={e => {
          e.stopPropagation() // 이벤트 버블링 방지(부모요소의 onClick호출방지)
          onRemove()
        }}>
        <X size={10} />
      </Button>
      {index === 0 && (
        <div
          className={`absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-blue-600 ${s.text} font-medium text-white shadow-sm`}>
          메인
        </div>
      )}
    </div>
  )
}

/** 드래그 가능한 이미지 리스트 */
export default function ImagesEditor({
  images,
  setImages,
  onActiveIndexChange,
  IsShowAddImageButton = true,
  onImageUpload,
  className,
  size = 'sm',
}: {
  images: string[]
  setImages: Dispatch<SetStateAction<string[]>>
  /** 선택된 index를 부모컴포넌트에 전달 및 이미지 순서가 바뀌고나서 실행할 후처리 */
  onActiveIndexChange?: (_index: number) => void
  IsShowAddImageButton?: boolean
  onImageUpload?: (_e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  size?: 'sm' | 'md'
}) {
  const sensors = useSensors(useSensor(PointerSensor))
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const s = SIZE_MAP[size]

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = images.findIndex(img => img === active.id)
      const newIndex = images.findIndex(img => img === over?.id)

      setImages(prev => arrayMove(prev, oldIndex, newIndex))

      // 현재 activeImageIndex도 같이 바꿔줘야 자연스러움
      if (activeImageIndex === oldIndex) {
        // 드래그한 이미지가 현재 대표 이미지였다면,
        // 새 위치(newIndex)로 업데이트해서 대표 이미지 인덱스를 따라가도록 함
        handleSetActiveImageIndex(newIndex)
      } else if (oldIndex < activeImageIndex && newIndex >= activeImageIndex) {
        // 대표 이미지보다 앞에 있던 이미지가 드래그로 뒤쪽으로 이동하면서
        // 대표 이미지가 한 칸 앞으로 밀리게 됨 → 인덱스를 1 감소시켜 보정
        handleSetActiveImageIndex(activeImageIndex - 1)
      } else if (oldIndex > activeImageIndex && newIndex <= activeImageIndex) {
        // 대표 이미지보다 뒤에 있던 이미지가 앞으로 이동하면서
        // 대표 이미지가 한 칸 뒤로 밀리게 됨 → 인덱스를 1 증가시켜 보정
        handleSetActiveImageIndex(activeImageIndex + 1)
      }
    }
  }

  const handleRemove = (indexToRemove: number) => {
    const newImages = images.filter((_, i) => i !== indexToRemove)
    setImages(newImages)

    // 선택된 이미지가 삭제되었거나 이후 인덱스가 줄었을 경우 처리
    if (indexToRemove === activeImageIndex) {
      handleSetActiveImageIndex(0)
    } else if (indexToRemove < activeImageIndex) {
      handleSetActiveImageIndex(activeImageIndex - 1)
    }
  }

  const handleSetActiveImageIndex = (index: number) => {
    setActiveImageIndex(index)
    onActiveIndexChange?.(index)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      // NOTE: 드래그 미러의 이동범위를 부모요소로 제한해
      // restrictToFirstScrollableAncestor는 스크롤 가능한 가장 가까운 조상요소까지만 드래그 허용하게함
      modifiers={[restrictToParentElement]}>
      <SortableContext items={images} strategy={verticalListSortingStrategy}>
        <div className={`flex flex-wrap gap-2 ${className}`}>
          {images.map((image, index) => (
            <SortableImage
              key={index}
              id={image}
              src={image}
              index={index}
              activeImageIndex={activeImageIndex}
              setActiveImageIndex={setActiveImageIndex}
              onClick={handleSetActiveImageIndex}
              onRemove={() => handleRemove(index)}
              size={size}
            />
          ))}
          {IsShowAddImageButton && (
            <label
              className={`relative group flex-shrink-0 ${s.box} rounded-md overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-gray-400 hover:bg-gray-50 cursor-pointer`}>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={onImageUpload}
                className="hidden"
              />
              <Plus className="h-6 w-6 text-gray-400" />
            </label>
          )}
        </div>
      </SortableContext>
    </DndContext>
  )
}
