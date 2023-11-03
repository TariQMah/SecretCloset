import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import { alpha, styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import Switch from '@mui/material/Switch';

export const formattedDate = (input, formated) => {
    const date = new Date(input);

    return format(date, formated || 'MM/dd/yyyy')
}

export const CustomSwitch = styled(Switch)(({ theme, variant }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: variant || red[600],
        '&:hover': {
            backgroundColor: alpha(variant || red[600], theme.palette.action.hoverOpacity),
        },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: variant || red[600],
    },
}));