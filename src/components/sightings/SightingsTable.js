
//This function is what displays as the contents for the reactBootStrap table
export const SightingsTable = ({sightingTableProp}) => {

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