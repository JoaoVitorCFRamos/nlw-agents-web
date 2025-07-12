import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

type GetRoomsApiResponse = Array<{
  id: string;
  name: string;
}>;

export function CreateRoom() {
  const { data, isLoading } = useQuery({
    //parametro obrigatório para o UseQuery - Recebe uma identificação única para chamada, nesse caso como vamos chamar as rooms ficou get-rooms
    queryKey: ['get-rooms'],
    //parametro obrigatório 2 - Qual função vou executar para trazer os dados da api
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/rooms');
      const result: GetRoomsApiResponse = await response.json();
      return result;
    },
  });

  return (
    <div>
      <div>Create Room</div>

      {isLoading && <p>Carregando...</p>}

      <div className="gap1 flex flex-col">
        {data?.map((room) => {
          return (
            <Link key={room.id} to={`/room/${room.id}`}>
              {room.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
