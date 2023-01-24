import React, { FC, memo, useState } from 'react';
import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { TasksComponent } from '../components/tasks.component';
import { Task } from '../../../models/profile.model';
import { AlertsModel } from '../../../models/alerts.model';
import { AddTaskButton } from '../../../components/add-task-button';
import { AddTaskDialog } from '../../../components/add-task-dialog';
import { SERVER_URL } from '../../../utils/helpers';

interface TasksContainerProps {
	userPhone: string;
	tasks: Task[];
	getProfile: () => void;
	handleError: (error: AlertsModel) => void;
}

export const TasksContainer: FC<TasksContainerProps> = memo(({ userPhone, tasks, getProfile, handleError }) => {
	const [dialog, setDialog] = useState(false);

	const allTasks = tasks.filter(task => task.done !== true);
	const completedTasks = tasks.filter(task => task.done === true);

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
		await fetch(`${SERVER_URL}/add-task`, {
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

	const completeTask = async (task: Task) => {
		await fetch(`${SERVER_URL}/update-task`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'PUT',
			credentials: 'include',
			body: JSON.stringify({ phone: userPhone, task: { ...task, done: true } }),
		});
		await getProfile();

		handleError({ message: 'You have completed your task', severity: 'success' });
	};

	const deleteTask = async (task: Task) => {
		await fetch(`${SERVER_URL}/delete-task`, {
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
		<>
			<Container>
				<Grid
					container
					spacing={4}
					sx={{
						padding: '48px 0',
						mt: 3,
					}}
					justifyContent="center">
					<TasksComponent
						dialog={dialog}
						errors={errors}
						control={control}
						onSubmit={onSubmit}
						register={register}
						setValue={setValue}
						tasks={allTasks}
						deleteTask={deleteTask}
						completeTask={completeTask}
					/>
				</Grid>
				{completedTasks.length !== 0 && (
					<>
						<Divider />
						<Typography>Completed tasks</Typography>
					</>
				)}
				<Grid container spacing={4} sx={{ p: '48px 0 81px' }} justifyContent="center">
					<TasksComponent
						dialog={dialog}
						errors={errors}
						control={control}
						onSubmit={onSubmit}
						register={register}
						setValue={setValue}
						tasks={completedTasks}
						deleteTask={deleteTask}
						completeTask={completeTask}
					/>
				</Grid>
			</Container>
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
				<AddTaskButton openAddDialog={openAddDialog} />
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
		</>
	);
});
