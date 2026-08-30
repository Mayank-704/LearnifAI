const YouTubeEmbed = () => {
  return (
    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
      <iframe
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        src={`https://www.youtube.com/embed/2veo86CQpHA`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

export default YouTubeEmbed;

//<iframe width="1167" height="656" src="https://www.youtube.com/embed/2veo86CQpHA?list=PLFfivWYz8UyY" title="PRESENTING LearnifAI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>