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
import {postData} from "../services/service";

export default function EventForm({coordinates, callback}) {
    const [eventType, setEventType] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [name, setName] = React.useState('');
    const [selectedDate, setSelectedDate] = React.useState(dayjs());
    // const [posted, setPosted] = React.useState(false);

    const handleChange = (event) => {
        setEventType(event.target.value);
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            coordinates: `[[${coordinates.lat}, ${coordinates.lng}]]`,
            eventType,
            eventDate: selectedDate,
            description,
            name
        }

        postData(`https://capdragons.koyeb.app/api/v1/events`, JSON.stringify(data))
            .then(res => {
                const {status} = res;
                if (status && status.toString().startsWith("4")) {
                    console.log("error")
                } else {
                    console.log("POSTED!")
                    callback();
                }
            })
            .catch(e => console.log(e));
    }

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
                    id="outlined-basic2"
                    label="Name"
                    variant="outlined"
                    value={name}
                    sx={{ margin: 1 }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setName(event.target.value);
                    }}
                />
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

                <Button sx={{ margin: 1 }} onClick={handleSubmit}>Create!</Button>
            </FormControl>
        </Box>
    )
}