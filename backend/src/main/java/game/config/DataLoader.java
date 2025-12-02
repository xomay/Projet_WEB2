package game.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.CommandLineRunner;
import game.model.Map;
import game.service.MapRepository;

@Configuration
public class DataLoader {

    @Bean
    public CommandLineRunner initMaps(MapRepository mapRepository) {
        return args -> {
            if (mapRepository.count() == 0) {
                Map map1 = new Map();
                map1.setName("Map 1");
                map1.setTiles("plain,tree,plain,plain,plain,plain,water,plain,plain,plain,plain,tree,plain,water,plain,plain,plain,plain,plain,plain,tree,tree,water,plain,plain,plain,plain,tree,plain,tree,water,plain,plain,plain,plain,plain,tree,plain,plain,plain,plain,plain,water,plain,water,water,plain,plain,plain,water,plain,plain,tree,tree,plain,plain,plain,tree,plain,plain,tree,plain,tree,plain");

                Map map2 = new Map();
                map2.setName("Map 2");
                map2.setTiles("plain,plain,water,plain,plain,plain,water,plain,water,plain,plain,plain,water,plain,plain,plain,water,plain,plain,plain,water,tree,plain,plain,water,plain,plain,plain,water,plain,plain,water,water,plain,tree,tree,plain,plain,water,tree,water,water,water,plain,plain,water,plain,plain,water,water,tree,tree,plain,tree,plain,plain,tree,plain,tree,water,tree,tree,tree,plain");

                mapRepository.save(map1);
                mapRepository.save(map2);
            }
            System.out.println("Maps initialized.");
        };
    }
}