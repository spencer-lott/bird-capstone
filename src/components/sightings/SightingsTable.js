
export const SightingsTable = ({sightingTableProp, updateTableSightings}) => {

    return(


      <tbody>
        <tr>
          <td>{sightingTableProp?.species}</td>
          <td>{sightingTableProp?.dateSeen}</td>
          <td>{sightingTableProp?.description}</td>
          <td>{sightingTableProp?.location}</td>
        </tr>

      </tbody>
    


    )
}