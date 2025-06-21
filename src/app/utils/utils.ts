export function getCardColor(types: any[]): string {

    if (!types || types.length === 0 || !types[0]?.type?.name) {
      return '#838383';
    }

    const type = types[0]?.type?.name;
    switch (type) {
      case 'fire': return '#f03535';
      case 'water': return '#35b5f0';
      case 'grass': return '#58e658';
      case 'electric': return '#e7df07';
      case 'psychic': return '#d743b7';
      case 'rock': return '#4a2d01';
      case 'bug': return '#bfef8bf7';
      case 'poison': return '#4a0146f7';
      case 'fighting': return '#eb9c09f7';
      case 'dragon': return '#7C6DA4';
      case 'ghost' : return '#594593';
      case 'fairy': return '#FB8AEC'
      case 'steel': return '#A8A8A8';
      case 'dark': return '#3D4E5B';
      case 'ice' : return '#4BD2C1'
      case 'flying ' : return '#A2BCEA';
      case 'ground': return '#1C1405'
      default: return '#838383';
    }
  }
