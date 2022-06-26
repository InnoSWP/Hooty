using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Innohoot.Migrations
{
    public partial class Quesstion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<List<Guid>>(
                name: "ShowResultPoll",
                table: "Sessions",
                type: "uuid[]",
                nullable: false);

            migrationBuilder.AddColumn<int>(
                name: "OrderNumber",
                table: "Polls",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsAnswer",
                table: "Options",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ShowResultPoll",
                table: "Sessions");

            migrationBuilder.DropColumn(
                name: "OrderNumber",
                table: "Polls");

            migrationBuilder.DropColumn(
                name: "IsAnswer",
                table: "Options");
        }
    }
}
