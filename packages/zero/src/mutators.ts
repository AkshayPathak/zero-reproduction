import { CustomMutatorDefs } from "@rocicorp/zero";
import { People, PeopleUpdate } from "./schema/people";
import { Schema } from "./schema/schema";

export function createMutators() {
  return {
    people: {
      async update(tx, person: PeopleUpdate) {
        const prev = await tx.query.people.where("id", person.id).one().run();
        console.log(prev?.id); // Prints the id on client but undefined on server
        await tx.mutate.people.update(person);
      },
    },
  } as const satisfies CustomMutatorDefs<Schema>;
}

export type Mutators = ReturnType<typeof createMutators>;
