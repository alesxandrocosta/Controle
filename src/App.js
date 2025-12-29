import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';

// Sample initial data
const initialMembers = [
  { id: '1', name: 'João Silva', status: 'Pendente', valor: 'R$ 1.500,00', vencimento: '15/01/2025' },
  { id: '2', name: 'Maria Santos', status: 'Pendente', valor: 'R$ 2.300,00', vencimento: '20/01/2025' },
  { id: '3', name: 'Pedro Oliveira', status: 'Pendente', valor: 'R$ 1.800,00', vencimento: '18/01/2025' },
  { id: '4', name: 'Ana Costa', status: 'Pendente', valor: 'R$ 2.100,00', vencimento: '25/01/2025' },
  { id: '5', name: 'Carlos Ferreira', status: 'Pendente', valor: 'R$ 1.900,00', vencimento: '22/01/2025' },
];

function App() {
  const [members, setMembers] = useState(initialMembers);
  const [consolidatedMembers, setConsolidatedMembers] = useState([]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Dropped outside a droppable area
    if (!destination) {
      return;
    }

    // Moving within the same list
    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === 'members') {
        const items = Array.from(members);
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);
        setMembers(items);
      } else {
        const items = Array.from(consolidatedMembers);
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);
        setConsolidatedMembers(items);
      }
      return;
    }

    // Moving from members to consolidated
    if (source.droppableId === 'members' && destination.droppableId === 'consolidated') {
      const sourceItems = Array.from(members);
      const destItems = Array.from(consolidatedMembers);
      const [movedItem] = sourceItems.splice(source.index, 1);
      movedItem.status = 'Consolidado';
      destItems.splice(destination.index, 0, movedItem);
      setMembers(sourceItems);
      setConsolidatedMembers(destItems);
    }

    // Moving from consolidated back to members
    if (source.droppableId === 'consolidated' && destination.droppableId === 'members') {
      const sourceItems = Array.from(consolidatedMembers);
      const destItems = Array.from(members);
      const [movedItem] = sourceItems.splice(source.index, 1);
      movedItem.status = 'Pendente';
      destItems.splice(destination.index, 0, movedItem);
      setConsolidatedMembers(sourceItems);
      setMembers(destItems);
    }
  };

  const handleSendBoleto = (member) => {
    const message = `Olá ${member.name}, seu boleto no valor de ${member.valor} com vencimento em ${member.vencimento} está disponível.`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSendAllBoletos = () => {
    if (members.length === 0) {
      alert('Não há associados pendentes para enviar boletos.');
      return;
    }
    
    members.forEach((member, index) => {
      setTimeout(() => {
        handleSendBoleto(member);
      }, index * 1000); // Delay between each message
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sistema de Análise de Negociações</h1>
        <p>Arraste e solte associados para consolidar suas negociações</p>
      </header>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="container-wrapper">
          <div className="column">
            <div className="column-header">
              <h2>Associados Pendentes</h2>
              <button 
                className="send-all-btn"
                onClick={handleSendAllBoletos}
                disabled={members.length === 0}
              >
                Enviar Todos os Boletos via WhatsApp
              </button>
            </div>
            <Droppable droppableId="members">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`member-list ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                >
                  {members.map((member, index) => (
                    <Draggable key={member.id} draggableId={member.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`member-card ${snapshot.isDragging ? 'dragging' : ''}`}
                        >
                          <div className="member-info">
                            <h3>{member.name}</h3>
                            <p className="member-status">{member.status}</p>
                            <div className="member-details">
                              <p><strong>Valor:</strong> {member.valor}</p>
                              <p><strong>Vencimento:</strong> {member.vencimento}</p>
                            </div>
                          </div>
                          <button 
                            className="send-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSendBoleto(member);
                            }}
                          >
                            Enviar Boleto
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  {members.length === 0 && (
                    <div className="empty-state">
                      Todos os associados foram processados
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          </div>

          <div className="column">
            <div className="column-header consolidated-header">
              <h2>Consolidados</h2>
              <span className="badge">{consolidatedMembers.length}</span>
            </div>
            <Droppable droppableId="consolidated">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`member-list consolidated ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                >
                  {consolidatedMembers.map((member, index) => (
                    <Draggable key={member.id} draggableId={member.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`member-card consolidated-card ${snapshot.isDragging ? 'dragging' : ''}`}
                        >
                          <div className="member-info">
                            <h3>{member.name}</h3>
                            <p className="member-status consolidated-status">{member.status}</p>
                            <div className="member-details">
                              <p><strong>Valor:</strong> {member.valor}</p>
                              <p><strong>Vencimento:</strong> {member.vencimento}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  {consolidatedMembers.length === 0 && (
                    <div className="empty-state">
                      Arraste associados aqui para consolidar
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
