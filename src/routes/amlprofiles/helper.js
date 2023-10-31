

module.exports.responseData = (profile) => {
  return profile ? {
    id: profile.id,
    fullName: profile.fullName,
    birthdate: profile.birthdate,
    country: profile.country,
    riskLevel: profile.riskLevel,
    riskPoints: profile.riskPoints,
    picture: profile.picture,
    articles: profile.AMLArticles.map(art => articleResponseData(art)),
    sanctions: profile.AMLSanctions.map(san => sanctionResponseData(san))
  } : null
}

const articleResponseData = (article) => {
  return article ? {
    content: article.content,
    link: article.link
  } : null
}

const sanctionResponseData = (sanction) => {
  return sanction ? {
    content: sanction.content
  } : null
}