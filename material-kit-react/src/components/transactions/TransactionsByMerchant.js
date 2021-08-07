import React, { useEffect, useState, useMemo} from 'react';
import axios from "axios";
import DataTable from 'react-data-table-component';
import './TransactionsByMerchant.css';

const TransactionsByMerchant = () => {

  const [data,setData] = useState([]);
  const [playOnce,setPlayOnce] = useState(true);
  const [filterText, setFilterText] = useState("");

  const columns = [
    {
      name : 'Libelle',
      selector : 'libelle',
      filterable : true,
    },
    {
      name : 'Adresse de facturation',
      selector : 'facturationAdresse',
      filterable : true,
    },
    {
      name : 'Adresse de livraison',
      selector : 'deliveryAdresse',
      filterable : true,
    },
    {
      name : 'Devise',
      selector : 'currency',
      filterable : true,
    },
    {
      name : 'Montant en €',
      selector : 'amount',
      filterable : true,
    },
    {
      name : 'Status',
      selector : 'status',
      filterable : true,
    },
    {
      name : 'Action',
      cell:(row) => <button onClick={() => alert(row._id)}>Consulter</button>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];

  useEffect(() => {

    //Fais en dur
    let id = 2

    //si l'api à la ressource n'a pas été jouer on le fait
    if(playOnce){
      axios.get('http://localhost:3001/transactions/?marchant_id='+id)
        .then(res => {
          setData(res.data)
          setPlayOnce(false)//empecher un autre appel à l'API

        } )
        .catch(error => console.log(error));
    }

  },[data,playOnce]);

  //On va filter les données selon le nom pour choisir un critère de filtre
  const filteredItems = data.filter(
    transaction => transaction.libelle &&
      transaction.libelle.toLowerCase().includes(filterText.toLowerCase()),
  );


  //Le composant de filtre ( le texte qu'on souhaite filtrer, la suppression et le changement de valeur)
  const FilterComponent = ( { filterText, onClear, onFilter }) => {

    return(
      <>
        <input id="search" type="text" placeholder="Filter By Name" aria-label="Search Input"
               className="filter-input-text" value={filterText} onChange={onFilter}/>
        <button type="button" className="button-clear" onClick={onClear}>X</button>
      </>
    )
  };

  //Utilisation de useMemo pour sauvegarder en mémoire la valeur recherchée en voulant filtrer.
  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setFilterText('');
      }
    };

    return (
      <FilterComponent onFilter={e => setFilterText(e.target.value)}
                       onClear={handleClear}
                       filterText={filterText} />
    );
  }, [filterText]);

  return (

    <div>
      <DataTable columns={columns}
                 data={filteredItems}
                 title="Liste des transactions du marchand connecté"
                 pagination
                 selectableRows
                 keyField={filteredItems.map(transaction => transaction._id )}
                 dense={true}
                 striped={true}
                 subHeader
                 subHeaderComponent={subHeaderComponentMemo}
                 persistTableHead

      />
    </div>
  );
};

export default TransactionsByMerchant;
