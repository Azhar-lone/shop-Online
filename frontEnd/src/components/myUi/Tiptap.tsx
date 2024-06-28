// src/Tiptap.jsx
import { useEditor, EditorContent, FloatingMenu, BubbleMenu, Editor } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import StarterKit from '@tiptap/starter-kit'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuItem
} from '@radix-ui/react-dropdown-menu'
import React, { useState } from 'react'

// icons
import { ChevronDown, SendHorizonal } from "lucide-react"
// define your extension array
import "@/styles/blog.css"
import Hint from './Hint'



interface TiptapProps {
    setHtml: React.Dispatch<React.SetStateAction<string>>
}

const extensions = [
    StarterKit,
]

const content = ''

const Tiptap = ({ setHtml }: TiptapProps) => {
    const editor = useEditor({
        extensions,
        content,
    })
    if (!editor) {
        return null
    }



    return (
        <div className='md:p-4 flex flex-col justify-end'>
            <div className='flex gap-1 justify-end border-b'>
                <TextManipulators editor={editor} />
                <Button variant={"outline"} onClick={() => editor.chain().focus().toggleBold().run()} className='font-extrabold text-2xl'>B</Button>
                <Button variant={"outline"} onClick={() => editor.chain().focus().toggleItalic().run()} className='italic text-2xl'>i</Button>
                <Headings editor={editor} />

            </div>
            <div className='border shadow-2xl rounded blog bg-background flex flex-col' >
                <EditorContent editor={editor} />
            </div>
            <SendHorizonal className='w-fit' />

        </div>


    )
}

export default Tiptap

interface HeadingProps {
    editor: Editor
}












const Headings: React.FC<HeadingProps> = ({ editor }) => {
    const [selected, setSelected] = useState<number>(1)
    return (
        <DropdownMenu>
            <div className='flex'>
                <Button variant={"outline"} className='text-2xl'
                    onClick={() => editor.chain().focus().toggleHeading({ level: selected }).run()}
                >
                    h{selected}
                </Button>
                <DropdownMenuTrigger>

                    <ChevronDown />

                </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent>
                <  DropdownMenuSeparator />
                {Array(6).fill(0).map((_, i: number) => (
                    <div key={i}>
                        <DropdownMenuItem
                            className='gap-2 cursor-pointer mr-5 p-4 bg-background shadow-2xl'
                            onClick={() => {

                                editor.chain().focus().toggleHeading({ level: (i + 1) }).run()

                                setSelected(i + 1)

                            }}
                        >
                            h{i + 1}
                        </DropdownMenuItem>
                    </div>

                ))}
            </DropdownMenuContent >
        </DropdownMenu>
    )
}













const TextManipulators: React.FC<HeadingProps> = ({ editor }) => {
    return (
        <DropdownMenu>

            <DropdownMenuTrigger>
                <Hint label={"Text Manipulations Tools"}>
                    <Button variant={"outline"} className='text-2xl'>
                        T
                    </Button>
                </Hint>
            </DropdownMenuTrigger>
            <DropdownMenuContent>

                <Button variant={"outline"} onClick={() => editor.chain().focus().toggleStrike().run()} className='font-extrabold text-2xl line-through'>L</Button>

            </DropdownMenuContent >
        </DropdownMenu>
    )
}