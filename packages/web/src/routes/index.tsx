import { useQuery, useZero } from "@rocicorp/zero/react";
import { createFileRoute } from "@tanstack/react-router";
import type { Mutators } from "@new-zero/zero/mutators";
import type { Schema } from "@new-zero/zero/schema/schema";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const z = useZero<Schema, Mutators>();

  const [people] = useQuery(z.query.people);

  return (
    <div>
      <h1>People</h1>
      {people.length > 0 && (
        <ul className="space-y-2 max-w-lg">
          {people.map((person) => (
            <li key={person.id} className="flex justify-between items-center">
              <span>
                {person.first_name} {person.last_name}
              </span>
              <Button
                size="sm"
                onClick={() => {
                  z.mutate.people.update({
                    id: person.id,
                    tenant_id: person.tenant_id,
                    first_name: "John",
                    last_name: "Doe",
                  });
                }}
              >
                Update
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
