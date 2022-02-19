import * as React from 'react'
import { FormControl, FormLabel, Textarea } from '@chakra-ui/react'
import type { SerializedForm } from '@/types'

interface Props {
  form: SerializedForm
}

export default function ScriptDisplayer({ form }: Props) {
  const origin = window.location.origin

  return (
    <FormControl>
      <FormLabel>Script</FormLabel>
      <Textarea
        readOnly
        defaultValue={`
          // for fun by now
          // dont use that shit

          function initForm(id) {
            let a = "${origin}/api/actions/${form.actionName}"
            let v = ${JSON.stringify(form.schema)}
            
            v.forEach(item => {
              var ele = document.createElement(item.type);
              for (const [key, value] of Object.entries(item.config)) {
                ele.setAttribute(key, value);
              }
              document.getElementById(id).appendChild(ele)
            })
          }

          initForm('target')
      `}
      />
    </FormControl>
  )
}
