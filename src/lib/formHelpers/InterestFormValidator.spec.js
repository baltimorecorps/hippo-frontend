import {cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {interestValidator} from './formValidator';
// example

afterEach(cleanup);
describe('Interest Form Validation', () => {
  test('Interest Statement Form: Blank Value', () => {
    const value = '';

    const expectedErr = {
      interestText_error: 'Required',
    };
    const {isError, err} = interestValidator(value);

    expect(isError).toBe(true);
    expect(err).toEqual(expectedErr);
  });
  test('Interest Statement Form: Too Long Value', () => {
    const textLongerThan2000characters =
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi nesciunt assumenda, saepe, architecto laboriosam pariatur ipsa dignissimos accusamus deserunt id ea soluta tempore praesentium. Quos eius consectetur nam. Provident id quas nemo? Mollitia dignissimos, necessitatibus in natus odio libero sed architecto eos placeat laborum reprehenderit totam doloribus, dicta quibusdam autem perferendis ab minus asperiores perspiciatis fugiat maiores voluptate sint quasi? Accusantium, mollitia repudiandae? Cum, impedit quia provident expedita neque ex aliquid obcaecati iste quasi ducimus sequi labore tenetur aperiam fugit illo optio, quibusdam enim officiis quaerat. Minima nesciunt, adipisci eligendi accusantium suscipit eveniet porro ea eum id, ab amet consequatur reprehenderit numquam ipsum autem incidunt similique blanditiis eos aperiam ad pariatur quis accusamus. Quaerat placeat nobis optio sapiente dolor eaque! Vel, hic deserunt itaque dolor sint recusandae culpa non omnis architecto nihil quia odio. Id, alias cum iusto at quod voluptate maxime ea blanditiis. Enim quibusdam laudantium sapiente optio tempore vero veritatis sint eius nihil asperiores alias, dolores, distinctio illo incidunt dicta mollitia! Illo fugit maiores nihil labore mollitia amet quam quasi quaerat nostrum ullam. Eum asperiores quibusdam laboriosam quis veritatis similique odit pariatur fuga rerum necessitatibus velit voluptates sequi nulla exercitationem sit tenetur ullam accusantium ab expedita, earum maxime, ad distinctio ipsa neque? Aspernatur assumenda mollitia non modi commodi vitae, temporibus magnam in nulla quis voluptatibus sequi est numquam pariatur reprehenderit officia repellat animi. Deleniti ipsa odio inventore, blanditiis officia corrupti itaque quo natus sunt voluptatum est dolores facilis tempora neque at nihil quisquam laborum fugiat eos dignissimos, alias veniam nulla praesentium assumenda. Magnam dolorem harum earum explicabo, est ea incidunt ex eaque odit. Obcaecati ut sed impedit veritatis adipisci temporibus tempore! Provident cum consectetur voluptatum qui harum rem explicabo dolorum fugit exercitationem illo quod, minima esse, praesentium ipsum modi officiis pariatur deleniti delectus asperiores dolore nisi! Corporis aut impedit suscipit quisquam voluptatum expedita. Eveniet error adipisci perspiciatis! Adipisci eaque ad quae ducimus optio unde tenetur quam quasi laboriosam saepe, porro voluptatibus velit maiores architecto id dolore suscipit nam omnis consequatur voluptates, illo error corrupti. Eligendi cumque adipisci quas nisi, aliquam facilis sequi reiciendis, repellendus rerum rem maiores tempora corrupti ab expedita eveniet nobis ipsum sunt! Quibusdam eveniet voluptatibus molestiae corrupti numquam eos saepe. Neque eligendi quam eveniet velit cumque nemo minus, et laborum fugit ducimus animi, sequi, ut quia! Fugiat nam neque libero vero architecto aliquam, repellat facere dolores ab temporibus praesentium consequuntur soluta sit itaque consectetur officia quo earum dignissimos quidem asperiores facilis ratione adipisci ipsam. Vitae placeat cum iste! Sint dolorum dolores, voluptas nihil quas tempore corporis molestias hic. Distinctio temporibus impedit aperiam odit, ea suscipit dolore earum vitae ipsam nemo nobis officiis voluptatem modi in. Quos dignissimos in culpa. Ipsam itaque optio expedita nobis amet nam minus ad officia, rem eligendi nihil explicabo magni reiciendis beatae delectus? Velit pariatur illo hic fugit rerum quasi suscipit ut, voluptas fuga optio iure excepturi eligendi doloribus labore sunt odit perspiciatis, aut ratione nihil impedit? Fuga culpa labore, ex earum eligendi, debitis laboriosam ducimus voluptas eum adipisci consectetur quasi maiores esse autem molestias voluptatem error. Deleniti eos repellendus sed error molestiae deserunt ut amet praesentium ipsam impedit ea, aliquid consequuntur aliquam nisi obcaecati accusantium corporis inventore nostrum eaque perferendis animi est magni placeat. Necessitatibus magnam magni, consequatur libero culpa maxime repellendus dicta temporibus ipsa excepturi repellat? Aut pariatur minus blanditiis nulla? Sunt, placeat, necessitatibus quae, maiores laborum itaque exercitationem incidunt quisquam quasi ipsam omnis. Neque ullam eius natus possimus fugit praesentium dignissimos vitae quisquam. Aut sapiente corrupti aperiam animi eaque. Quo quos suscipit ipsa enim facilis voluptates tempora sint harum eius, velit, quibusdam, facere temporibus error repellendus. Nostrum saepe accusantium, quisquam sequi voluptate ad, pariatur quo reiciendis soluta inventore sit mollitia temporibus. Facilis quod molestias nostrum minima distinctio ullam hic. Quo aliquam saepe quis velit et sed, sequi expedita fuga quae blanditiis illo nostrum soluta maiores, quos, facilis quas. Nulla eaque saepe commodi adipisci fugiat explicabo ipsam quam, est fugit, autem sapiente facilis quis asperiores vel doloremque. Quasi est incidunt doloremque sed optio nisi porro atque! Consequatur et exercitationem earum ipsam in illum fugiat hic nulla dolor! Harum dignissimos dolor ut ex unde vero fuga eius perspiciatis nam quos tempora ipsum sed similique nulla iusto earum impedit incidunt, non quis nobis. Necessitatibus iste ipsa laudantium libero repellat blanditiis voluptatum voluptates voluptatem, veniam nulla debitis quam, cum ut rerum, perspiciatis consequuntur culpa assumenda nesciunt veritatis? Aperiam nihil, libero ipsam temporibus, nam, vitae odio fugit non consequuntur optio ut sapiente eveniet incidunt! Quibusdam sed porro molestias, illo voluptate quia expedita cupiditate totam facere quod ut rerum consequuntur quasi exercitationem deleniti eaque debitis. Deserunt tempora maxime dolorem mollitia ad aspernatur eum natus veniam nisi ipsa commodi porro voluptas cupiditate neque eaque odit, officia quibusdam error sapiente. Itaque, nam repellendus aperiam consequuntur id excepturi corporis iste pariatur soluta eligendi quis dicta provident suscipit! Odit minima quis laudantium commodi! Accusamus quidem veritatis consequuntur eaque rem expedita incidunt possimus itaque ipsum tempore sapiente blanditiis sit nulla consequatur molestias placeat eius voluptatum asperiores, dignissimos similique quasi, non dolorum voluptatem id? Impedit cumque, at incidunt facilis eum blanditiis fugit excepturi nulla! Quasi modi, est eum quisquam suscipit quidem maxime ea dolore. Ullam repellendus asperiores nemo nostrum impedit eos suscipit pariatur vitae illo saepe sint vero provident, laborum eaque! Quam odio quos in voluptatum labore dolorum necessitatibus praesentium, voluptates itaque officia pariatur sunt ea aliquam. Quas dignissimos cum dolore, ipsum nam quae rerum, nemo corrupti porro ut tempora debitis dolorem inventore. Quia, inventore? Saepe explicabo facere fugiat placeat deleniti dolore expedita, alias ducimus. A molestiae in explicabo sit? Nam officia adipisci quia quo minima minus nostrum. Accusantium fugit delectus voluptatum nobis, totam ab dolorem sapiente odit labore quisquam omnis suscipit iusto. Ad alias tempora asperiores optio explicabo neque vel, iusto provident cum ipsa, nulla, nesciunt reprehenderit voluptatem ea quibusdam delectus consequatur quam necessitatibus. Consectetur, voluptatibus. Esse, deleniti. Veniam accusamus eos cum amet perspiciatis architecto saepe ex distinctio, porro necessitatibus, delectus aliquid doloribus numquam accusantium neque recusandae cupiditate repellendus nemo, totam beatae eligendi magnam reprehenderit. Voluptas aut sequi harum?';

    const value = textLongerThan2000characters;

    const expectedErr = {
      interestText_error:
        'Interest statement must be less than 2,000 characters',
    };
    const {isError, err} = interestValidator(value);

    expect(isError).toBe(true);
    expect(err).toEqual(expectedErr);
  });

  test('Interest Statement Form: Valid Value', () => {
    const value = 'Some text';

    const expectedErr = {};
    const {isError, err} = interestValidator(value);

    expect(isError).toBe(false);
    expect(err).toEqual(expectedErr);
  });
});
