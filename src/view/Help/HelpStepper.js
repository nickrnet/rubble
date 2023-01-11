import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import HelpSetupCard from './HelpSetupCard';
import HelpGamePlayCard from './HelpGamePlayCard';
import HelpSpecificRulesCard from './HelpSpecificRulesCard';

const sections = ['Setup', 'Game Play', 'Specific Rules'];

export default function HelpStepper(
    {
        closeHelp
    }
) {
    const [activeStep, setActiveStep] = useState(0);
    const [helpCard, setHelpCard] = useState(<div></div>);

    useEffect(() => {
        if (activeStep === 0) {
            setHelpCard(<HelpSetupCard />);
        }
        else if (activeStep === 1) {
            setHelpCard(<HelpGamePlayCard />);
        }
        else if (activeStep === 2) {
            setHelpCard(<HelpSpecificRulesCard />);
        }
    }, [activeStep]);

    const handleNext = () => {
        console.log(`Current Step: ${activeStep}`);
        if (activeStep >= sections.length-1) {
            setActiveStep(0);
            closeHelp();
        }
        else {
            setActiveStep(activeStep + 1);
        }
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
            {sections.map((label, index) => {
                return (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                );
            })}
            </Stepper>
            <Card sx={{ minWidth: 275 }}>
                {helpCard}
                <CardActions>
                    <Button size="small" onClick={handleNext}>Next</Button>
                    <Button size="small" onClick={closeHelp}>Close</Button>
                </CardActions>
            </Card>
        </Box>
    );
}
