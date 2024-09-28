import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function EventForm({coordinates}) {
    const [eventType, setEventType] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [selectedDate, setSelectedDate] = React.useState(dayjs());

    const handleChange = (event) => {
        setEventType(event.target.value);
    };

    const createEvent = () => {
        console.log(eventType, description, coordinates)
    };

    return (
        <Box sx={{ minWidth: 240, padding: 2 }}>
            <FormControl fullWidth>
                <InputLabel
                    id="demo-simple-select-label"
                >
                    Event
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={eventType}
                    label="Age"
                    onChange={handleChange}
                    sx={{ margin: 1 }}
                >
                    <MenuItem value="PLANT_TREE">Plant tree</MenuItem>
                    <MenuItem value="BICYCLE_RIDE">Bicycle ride</MenuItem>
                    <MenuItem value="GREEN_FAIR">Green fair</MenuItem>
                </Select>

                <TextField
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                    value={description}
                    sx={{ margin: 1 }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setDescription(event.target.value);
                    }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Date"
                        value={selectedDate}
                        sx={{ margin: 1 }}
                        onChange={(newDate) => {
                            setSelectedDate(newDate);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>

                <Button sx={{ margin: 1 }} onClick={createEvent}>Create!</Button>
            </FormControl>
        </Box>
    )
}