'use client'
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase/config'
import Loading from './Loading'

const TableStructure = () => {

    const [tasks, setTasks] = useState('');

    useEffect(() => {
        getTasks();
    }, [])

    const getTasks = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "tasks"));
            const teamMembers = []; // Initialize an empty array

            querySnapshot.forEach((doc) => {
                // Push each document's data to the array
                    teamMembers.push({
                        id: doc.id,
                        data: doc.data()
                    });
            });
            console.log(teamMembers);

            setTasks(teamMembers);
        } catch (error) {
            console.error("Error getting team members: ", error);
            return []; // Return an empty array if there's an error
        }
    };
    if(tasks){

        return (
            <Table className="">
                <TableHeader>
                    <TableRow className="border border-black">
                        <TableHead className="w-[300px] font-semibold">Task Name</TableHead>
                        <TableHead className="font-semibold">Assignee</TableHead>
                        <TableHead className="font-semibold text-center">Status</TableHead>
                        <TableHead className="text-right font-semibold">Difficulty</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody >
                    {tasks.map((invoice) => (
                        <TableRow key={invoice.invoice} className=" odd:bg-primary/10">
                            <TableCell className="font-medium">{invoice.data.title}</TableCell>
                            <TableCell>{invoice.data.assignee}</TableCell>
                            <TableCell><Progress className="bg-slate-400" value={invoice.data.completion ? 100 : 1} />
                            </TableCell>
                            <TableCell className="text-right">{invoice.data.difficulty}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }else{
        return <Loading/>;
    }
}

export default TableStructure