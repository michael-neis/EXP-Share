import SvgIcon from '@mui/material/SvgIcon';
import Fab from '@mui/material/Fab';
import {Link} from 'react-router-dom'



function DiscoverGames(){

    function HomeIcon(props) {
        return (
          <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </SvgIcon>
        );
      }

    return(
        <div>
            <Link to="/" style={{ textDecoration: 'none', position: 'absolute', marginLeft: 20 }}>
                <Fab color="active" size="small">
                    <HomeIcon />
                </Fab>
            </Link>
            Discover
        </div>
    )
}

export default DiscoverGames