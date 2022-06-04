export const MemePage = ({title, urlImg}: any) => {
    return <div className="MemePage">
        <div className="MemePage">
            <p>{title}</p>
        </div>
        <div>
            <img src={urlImg[0].url} alt="Memesek"/>
        </div>
    </div>
}
