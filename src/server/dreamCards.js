//-----------------------------------------------------------------------
// GET
//-----------------------------------------------------------------------

// Returns the number of NFTs left to purchase
export async function getDreamCards() {
  try {
    const response = await fetch(`https://api.dreamhunter.io/dreamCard/`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const result = await response.json();
    return (result.dreamCard);
  } catch (err) {
    console.log(err);
  }
}

//-----------------------------------------------------------------------
// SET
//-----------------------------------------------------------------------
