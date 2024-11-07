import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useAuth } from "context/AuthContext";
import type { Tournament } from "types/models";
import api from "api/axios";

const History: React.FC = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchTournaments = async (): Promise<void> => {
      try {
        const tournamentsData = await api.tournaments.getAll();
        const filteredTournaments = tournamentsData.filter((tournament) =>
          tournament.players.some((player) => player.id === userId)
        );
        // Sort tournaments based on startDate
        filteredTournaments.sort(
          (a, b) =>
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
        setTournaments(filteredTournaments);
        console.log(filteredTournaments);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      }
    };

    void fetchTournaments();
  }, [userId]);

  const headers = [
    "Tournament name",
    "Date",
    "Placement",
    "Matches",
    " Wins",
    "Losses",
    "Ties",
    "Points",
    ""
  ];

  return (
    <>
      <h1>My tournament history</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map((header) => {
                return (
                  <TableCell sx={{ fontWeight: "bold" }} key={header}>
                    {header}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {tournaments.map((tournament) => (
              <TableRow key={tournament.name}>
                <TableCell key={tournament.name}>{tournament.name}</TableCell>
                <TableCell key={tournament.startDate}>
                  {new Date(tournament.startDate).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell key={tournament.endDate}>
                  {tournament.endDate}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default History;
