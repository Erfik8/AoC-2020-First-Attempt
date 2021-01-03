

function part1(input_table)
{
  var mem = [];

  var mask = "";
  //var values = [];
  for (var line of input_table) {
    var type = line.split(" ")[0];
    if(type == "mask") {
      mask = line.split(" ")[2];
      //console.log(mask);
    }
    else
    {
      var address = parseInt(line.split(" ")[0].split("[")[1]);
      var values = parseInt(line.split(" ")[2]);

      var value_as_bin = values.toString(2);
      var mask_reverted = mask.split("").reverse();
      var value_as_bin_reverted = value_as_bin.split("").reverse();
      for(var i = 0; i < mask_reverted.length; i++)
      {
        if(value_as_bin_reverted[i] == undefined)
        {
          var sign_to_insert = mask_reverted[i] == "X" ? "0" : mask_reverted[i];
          value_as_bin_reverted.push(sign_to_insert);
        }
        else if(value_as_bin_reverted[i] != mask_reverted[i] && mask_reverted[i] != "X") value_as_bin_reverted[i] = mask_reverted[i];
      }
      value_as_bin = value_as_bin_reverted.reverse().join("");
      values = parseInt(value_as_bin, 2);
      mem[address] = values;
      //console.log(address + " ==> " + values);
      //console.log("mask: " + mask);
    }
  }
  var sum = 0;
  for(var element of mem)
  {
    if(element == undefined) continue;
    sum += element;
  }
  return sum;
  //console.log(masks);
  //console.log(values);
}

function part2(input_table)
{
  var mem = new Array();

  var mask = "";
  for (var line of input_table) {
    var type = line.split(" ")[0];
    if(type == "mask") {
      mask = line.split(" ")[2];
      //console.log(mask);
    }
    else
    {
      var address = parseInt(line.split(" ")[0].split("[")[1]);
      var values = parseInt(line.split(" ")[2]);

      var address_as_bin = address.toString(2);
      var mask_reverted = mask.split("").reverse();
      var address_as_bin_reverted = address_as_bin.split("").reverse();

      var address_combinations = [];
      for(var i = 0; i < mask_reverted.length; i++)
      {
        if(address_as_bin_reverted[i] == undefined)
        {
          address_as_bin_reverted.push(mask_reverted[i]);
        }
        else if(mask_reverted[i] != "0") address_as_bin_reverted[i] = mask_reverted[i];
      }
      address_combinations.push(address_as_bin_reverted.reverse().join(""));

      while(address_combinations.find(function(element){return element.includes("X")}))
      {
        var element_index = address_combinations.findIndex(function(element){return element.includes("X")});
        var element = address_combinations[element_index];
        address_combinations.splice(element_index,1);
        address_combinations.push(element.replace("X","0"));
        address_combinations.push(element.replace("X","1"));
      }

      for(var adrs of address_combinations)
      {
        mem[adrs] = values;
      }
      //console.log(address + " ==> " + address_combinations[0] + " ==> " + values);
      //console.log("mask: " + mask);
    }
  }
  //mem = mem.filter(function(element){return element != undefined});
  //console.log(mem);
  var sum = 0;
  for(var index in mem)
  {
    sum += mem[index];
  }
  return sum;
}


function input_day()
{
  input_table = document.getElementById("result").innerHTML.split("\n").map(x => x.trim());
  console.log(part1(input_table));
  console.log(part2(input_table));
}
// 16:18


// 16:57 part1


// 17:47 part2
