import React, { FC, memo, useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { TasksComponent } from '../components/tasks.component';
import { Task } from '../../../models/profile.model';
import { AddTaskDialog } from '../../../components/add-task-dialog';
import { AddTaskButton } from '../../../components/add-task-button';
import { AlertsModel } from '../../../models/alerts.model';

interface TasksContainerProps {
	userPhone: string;
	tasks: Task[];
	getProfile: () => void;
	handleError: (error: AlertsModel) => void;
}

export const TasksContainer: FC<TasksContainerProps> = memo(({ userPhone, tasks, getProfile, handleError }) => {
	const [dialog, setDialog] = useState(false);

	const {
		control,
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		reset,
	} = useForm<Task>({
		mode: 'onSubmit',
		defaultValues: { title: '', date: new Date(new Date().setHours(new Date().getHours() + 1)) },
	});

	const onSubmit = handleSubmit(async (task: Task) => {
		await fetch(`${process.env.REACT_APP_SERVER_URL}/add-task`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify({ phone: userPhone, task }),
		});
		await getProfile();

		reset();
		closeAddDialog();
	});

	const closeAddDialog = () => {
		setDialog(false);
	};

	const openAddDialog = () => {
		setDialog(true);
	};

	const completeTask = async (task: string) => {
		await deleteTask(task);

		handleError({ message: 'You have completed your task', severity: 'success' });
	};

	const deleteTask = async (task: string) => {
		await fetch(`${process.env.REACT_APP_SERVER_URL}/delete-task`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'DELETE',
			credentials: 'include',
			body: JSON.stringify({ phone: userPhone, task }),
		});
		await getProfile();

		handleError({ message: 'You have removed your task', severity: 'success' });
	};

	return (
		<Container>
			<Grid container spacing={8} justifyContent="center" padding={'64px 0'}>
				<TasksComponent
					dialog={dialog}
					errors={errors}
					control={control}
					onSubmit={onSubmit}
					register={register}
					setValue={setValue}
					tasks={tasks}
					deleteTask={deleteTask}
					completeTask={completeTask}
				/>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column',
						justifyContent: 'space-evenly',
						position: 'absolute',
						top: '81px',
						right: '50%',
						transform: 'translateX(50%)',
					}}>
					{tasks.length === 0 && <Typography mb={1}>Add your first task</Typography>}
					<AddTaskButton
						styles={{
							width: '100%',
							height: '32px',
						}}
						openAddDialog={openAddDialog}
					/>
				</Box>
				<AddTaskDialog
					dialog={dialog}
					errors={errors}
					control={control}
					onSubmit={onSubmit}
					setValue={setValue}
					register={register}
					closeAddDialog={closeAddDialog}
				/>
			</Grid>
		</Container>
	);
});
