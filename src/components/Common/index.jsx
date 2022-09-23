import * as React from "react";
import { useState } from "react"
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button"

export const JInputTextButton = ({ onSubmit }) => {
  const [value, setValue] = useState('')

  const onLocalSubmit = () => {
    onSubmit(value)
  }
  const fireSubmit = (evt) => {
    if (evt.key === 'Enter') onLocalSubmit()
  }

  return (
    <Paper
      elevation={4}
      sx={{ p: 0, display: "flex", alignItems: "center", borderRadius: 0, width: 662, height: 68, overflow: "hidden" }} >
      <InputBase
        sx={{ ml: 1, flex: 1, fontSize: '1.5rem' }}
        placeholder="Your name..."
        inputProps={{ "aria-label": "Your name..." }}
        value={value}
        onChange={ evt=>setValue(evt.target.value) }
        onKeyDown={fireSubmit} />
      <Button 
        sx={{ borderRadius: 0, height: 68, width: 209, fontSize: '1.5rem' }} 
        variant="contained"
        onClick={onLocalSubmit}>Bigin</Button>
    </Paper>
  )
}