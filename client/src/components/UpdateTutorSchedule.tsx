interface Day {
    start: string;
    end: string;
    location: string;
}

interface Props {
    schedule: {
        mon: Day[],
        tue: Day[],
        wed: Day[],
        thu: Day[],
        fri: Day[],
        sat: Day[],
        sun: Day[], 
    };
}

const UpdateTutorSchedule: React.FC<Props> = ({}) => {
    return <>Schedule</>
}

export default UpdateTutorSchedule;