'use client'

import { Input } from '@nextui-org/react'
import React, { useState } from 'react'
import * as actions from '@/actions'
import { useSearchParams } from 'next/navigation'

export default function SearchInput() {
  const searchParams = useSearchParams()
  const [valueState, setValueState] = useState(searchParams.get('name') || '')


  return (
    <div className="w-[200px] rounded-2xl flex justify-center items-center bg-gradient-to-tr from-purple-200 to-white-500 text-white shadow-lg">
      <form action={actions.search}>
        <Input
          value={valueState}
          onChange={(e) => { setValueState(e.target.value) }}
          name='name'
          isClearable
          classNames={{
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "!bg-default-200/50",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "group-data-[focus=true]:bg-default-200/50",
              "dark:group-data-[focus=true]:bg-default/60",
              "!cursor-text",
            ],
          }}
          placeholder="Type to search..."
          radius="lg"
        />
      </form>
    </div>
  )
}
