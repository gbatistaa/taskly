import { TaskColumn } from 'src/modules/task-column/entities/task-column.entity';
import { Team } from 'src/modules/team/entities/team.entity';
import { AppDataSource } from '../data-source';

async function seedTaskColumns() {
  await AppDataSource.initialize();

  const teamRepo = AppDataSource.getRepository(Team);
  const columnRepo = AppDataSource.getRepository(TaskColumn);

  const teams = await teamRepo.find({
    select: ['id'],
  });

  if (teams.length === 0) {
    console.log('No teams found — skipping seed');
    process.exit(0);
  }

  for (const team of teams) {
    const existing = await columnRepo.find({
      where: { teamId: team.id },
      select: ['position'],
    });

    const existingPositions = new Set(existing.map((c) => c.position));

    const defaults = [
      { name: 'To Do', color: '#ef4444', position: 0 },
      { name: 'In Progress', color: '#f59e0b', position: 1 },
      { name: 'Done', color: '#10b981', position: 2 },
    ];

    const toInsert = defaults
      .filter((col) => !existingPositions.has(col.position))
      .map((col) => ({
        ...col,
        teamId: team.id,
      }));

    if (toInsert.length > 0) {
      await columnRepo.insert(toInsert);
      console.log(`Inserted ${toInsert.length} columns for team ${team.id}`);
    } else {
      console.log(`Team ${team.id} already seeded`);
    }
  }

  console.log('TaskColumn seed finished');
  process.exit(0);
}

seedTaskColumns().catch((err) => {
  console.error(err);
  process.exit(1);
});
