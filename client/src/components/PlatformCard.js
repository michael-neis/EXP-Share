

function PlatformCard({platform}){

    return(
        <a href={platform.websites ? platform.websites[0].url : null} target="_blank">
            <img alt={platform.name} className='platform-image' title={platform.name} src={platform.platform_logo ? `https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${platform.platform_logo.image_id}.jpg` : 'http://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg'}/>
        </a>
    )
}

export default PlatformCard