'use client'

import { Search } from 'lucide-react'
import { Input } from './ui/input'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDebounce } from '@/hooks/use-debounce'
import queryString from 'query-string'

const SearchInput = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const categoryId = searchParams.get('categoryId')
  const name = searchParams.get('name')

  const [value, setValue] = useState(name || '')
  const debouncedValue = useDebounce(value, 500) // 500ms debounce time for search input value change to update the url

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    const query = {
      name: debouncedValue,
      categoryId,
    }

    const url = queryString.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipEmptyString: true, skipNull: true }
    )

    router.push(url)
  }, [debouncedValue, router, categoryId])

  return (
    <div className='relative'>
      <Search className='absolute h-4 w-4 top-3 left-4 text-muted-foreground' />
      <Input
        onChange={onChange}
        value={value}
        placeholder='Search...'
        className='pl-10 bg-primary/10'
      />
    </div>
  )
}

export default SearchInput
