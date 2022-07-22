import React, { FC } from 'react';
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { Delete, Done } from '@mui/icons-material';
import { AddFormProps } from '../../../models/form.model';
import { Task } from '../../../models/profile.model';
import { UseFormRegister } from 'react-hook-form';

interface TasksComponentProps extends AddFormProps {
	dialog: boolean;
	tasks: Task[];
	register: UseFormRegister<Task>;
	deleteTask: (task: Task) => Promise<void>;
	completeTask?: (task: Task) => Promise<void>;
}

export const TasksComponent: FC<TasksComponentProps> = ({ tasks, deleteTask, completeTask }) => {
	return (
		<>
			{tasks.map(task => (
				<Grid key={task.title} item md={4} sm={6} xs={11}>
					<Card sx={task.done && { background: '#1976d21f' }}>
						<CardContent
							sx={{
								minHeight: 100,
								overflow: 'scroll',
								display: 'flex',
								alignItems: 'baseline',
								justifyContent: 'start',
							}}>
							<Typography variant="h5" component="h3">
								{task.title}
							</Typography>
						</CardContent>
						<CardActions sx={{ justifyContent: 'center' }}>
							{!task.done && (
								<Button onClick={() => completeTask(task)}>
									<Done />
								</Button>
							)}
							<Button onClick={() => deleteTask(task)}>
								<Delete />
							</Button>
						</CardActions>
					</Card>
				</Grid>
			))}
		</>
	);
};
